'use client';

import React, { useEffect, useState } from 'react';

import Dropzone, { DropzoneState } from 'react-dropzone';

import Heading from '@/components/shared/Heading';
import Paragraph from '@/components/shared/Paragraph';

import { formatBytes } from '@/lib/utils/helper';

import Button from '../Button';
import Image from '../Image';
import { ImagePreview } from '../ImagePreview';
import ModalContainer from '../ModalContainer';
import Toast from '../Toast';

interface UploadFileProps {
  isInvalid: boolean;
  multiple?: boolean;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  onChange: (files: (string | File)[] | null) => void;
  fileSize?: number; // max file size in MB
  displayFile?: string | string[];
}

type SelectedFile = {
  name: string;
  preview: string;
  formattedSize?: string;
};

const UploadFile: React.FC<UploadFileProps> = ({
  isInvalid,
  multiple = false,
  maxFiles = 1,
  accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
  },
  onChange,
  fileSize = 1,
  displayFile,
}) => {
  const [combinedFiles, setCombinedFiles] = useState<(string | File)[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  useEffect(() => {
    if (!displayFile) return;

    const files: (string | File)[] = Array.isArray(displayFile) ? displayFile : [displayFile];

    setCombinedFiles(files);

    const previews = files.map((file) => ({
      name: typeof file === 'string' ? file.split('/').pop() || 'Image' : file.name,
      preview: typeof file === 'string' ? file : URL.createObjectURL(file),
      formattedSize: typeof file === 'string' ? undefined : formatBytes(file.size),
    }));

    setSelectedFiles(previews);
  }, [displayFile]);

  const handleChange = (files: File[]) => {
    if (!files.length) return;

    const oversized = files.filter((file) => file.size / (1024 * 1024) > fileSize);
    if (oversized.length > 0) {
      oversized.forEach((file) =>
        Toast({
          type: 'error',
          message: `${file.name} exceeds ${fileSize} MB`,
        })
      );
      return;
    }

    const newPreviews = files.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    }));

    const newCombined = multiple
      ? [...combinedFiles, ...files].slice(0, maxFiles)
      : files.slice(0, 1);

    const newSelected = multiple
      ? [...selectedFiles, ...newPreviews].slice(0, maxFiles)
      : newPreviews.slice(0, 1);

    setCombinedFiles(newCombined);
    setSelectedFiles(newSelected);

    onChange(newCombined);
  };

  const handleDelete = (fileToDelete: SelectedFile) => {
    setSelectedFiles((prev) => prev.filter((f) => f.preview !== fileToDelete.preview));

    // Remove from main array
    const updatedCombined = combinedFiles.filter((f) => {
      if (typeof f === 'string') {
        return f !== fileToDelete.preview;
      } else {
        return f.name !== fileToDelete.name;
      }
    });

    setCombinedFiles(updatedCombined);

    onChange(updatedCombined.length ? updatedCombined : null);
  };

  const getExtensions = () =>
    Object.values(accept)
      .flat()
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1');

  return (
    <div
      className={`
        border-2 border-dashed rounded-[var(--radius)]
        p-6 text-center cursor-pointer
        ${isInvalid ? 'border-destructive' : 'border-border'}
      `}
    >
      <Dropzone
        disabled={selectedFiles.length >= maxFiles}
        maxFiles={maxFiles}
        accept={accept}
        multiple={multiple}
        onDrop={handleChange}
      >
        {({ getRootProps, getInputProps }: DropzoneState) => (
          <div
            {...getRootProps()}
            className={`${selectedFiles.length >= maxFiles ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-3">
              <div className="text-muted-foreground text-4xl">☁️</div>
              <Heading as="h4" size="lg" className="text-foreground">
                Drop {multiple ? 'files' : 'file'} here or click to upload
              </Heading>
              <Paragraph size="sm" variant="muted">
                File must be in {getExtensions()} format.
                {multiple && maxFiles && <span> You can upload up to {maxFiles} files.</span>}
              </Paragraph>
            </div>
          </div>
        )}
      </Dropzone>

      {/* Preview List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          {selectedFiles.map((f) => (
            <div
              key={f.preview}
              className="flex items-center justify-between bg-card p-3 rounded-[var(--radius)] border border-border"
            >
              {/* Image preview */}
              <ModalContainer title={f.name} content={() => <ImagePreview images={f.preview} />}>
                {(open) => (
                  <div className="flex items-center gap-3 cursor-pointer" onClick={open}>
                    <Image
                      src={f.preview}
                      alt={f.name}
                      width={80}
                      height={60}
                      className="rounded bg-secondary object-cover"
                    />
                    <div>
                      <Paragraph size="sm" className="font-medium">
                        {f.name}
                      </Paragraph>
                      {f.formattedSize && (
                        <Paragraph size="xs" variant="muted" className="flex justify-start">
                          {f.formattedSize}
                        </Paragraph>
                      )}
                    </div>
                  </div>
                )}
              </ModalContainer>

              <Button variant="destructive" size="sm" onClick={() => handleDelete(f)}>
                Delete
              </Button>
            </div>
          ))}

          {/* "View All" button */}
          <ModalContainer
            title="Images"
            content={() => <ImagePreview images={selectedFiles.map((f) => f.preview)} />}
          >
            {(open) => (
              <Button variant="secondary" size="sm" onClick={open} className="mt-2">
                View All
              </Button>
            )}
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
