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
  onChange: (files: File | File[] | null) => void;
  fileSize?: number; // max file size in MB
  displayFile?: string | string[];
}

type SelectedFile = {
  name: string;
  preview: string;
  formattedSize?: string;
};

const UploadFile = ({
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
}: UploadFileProps) => {
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  // Handle local file selection
  const handleChange = (files: File[]) => {
    if (!files.length) return;

    const oversized = files.filter((file) => file.size / (1024 * 1024) > fileSize);
    if (oversized.length > 0) {
      oversized.forEach((file) =>
        Toast({ type: 'error', message: `${file.name} exceeds ${fileSize} MB` })
      );
      return;
    }

    // Create preview data for UI only
    const newPreviews = files.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    }));
    if (multiple) {
      let combinedOriginal = [...originalFiles, ...files];
      let combinedPreviews = [...selectedFiles, ...newPreviews];

      if (combinedOriginal.length > maxFiles) {
        combinedOriginal = combinedOriginal.slice(0, maxFiles);
        combinedPreviews = combinedPreviews.slice(0, maxFiles);
      }

      setOriginalFiles(combinedOriginal);
      setSelectedFiles(combinedPreviews);

      // Pass **File[]** to parent
      onChange(combinedOriginal);
    } else {
      setOriginalFiles(files);
      setSelectedFiles(newPreviews);

      // Pass single File to parent
      onChange(files[0]);
    }
  };

  // Handle parent-provided displayFile
  useEffect(() => {
    if (!displayFile) return;

    const files: (string | File)[] = Array.isArray(displayFile) ? displayFile : [displayFile];

    const newFiles: SelectedFile[] = files
      .map((file) => {
        if (typeof file === 'string') {
          const name = file.split('/').pop() || 'Preview';
          return { name, preview: file };
        } else if (file instanceof File) {
          return {
            name: file.name,
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size),
          };
        } else {
          return { name: 'Unknown', preview: '' };
        }
      })
      .filter((f) => f.preview); // remove empty previews

    setSelectedFiles(newFiles);
  }, [displayFile]);

  const handleDelete = (fileToDelete: SelectedFile) => {
    setSelectedFiles((prev) => prev.filter((f) => f.preview !== fileToDelete.preview));

    if (multiple) {
      const updated = originalFiles.filter((f) => f.name !== fileToDelete.name);
      setOriginalFiles(updated);
      onChange(updated.length ? updated : null);
    } else {
      setOriginalFiles([]);
      onChange(null);
    }
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
            className={`
     ${selectedFiles.length >= maxFiles ? 'opacity-60 cursor-not-allowed' : ''}
    `}
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

      {/* Previews */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          {selectedFiles.map((f) => (
            <div
              key={f.preview}
              className="flex items-center justify-between bg-card p-3 rounded-[var(--radius)] border border-border"
            >
              {/* Click image to open modal */}
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

          {/* View All Button for all images */}
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
