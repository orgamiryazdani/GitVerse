'use client';
import { useEffect, useState } from 'react';
import { Modal } from '../modal';
import { useGetCommitsActivities } from '@/hooks/useGetCommits';
import { commitActivityProps } from './commit.types';
import { useSearchParams } from 'next/navigation';
import { CommitActivityPlaceholder } from '../placeholders/commits';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { useDictionary } from '@/providers/dictionary-provider';

const CommitActivity: React.FC<commitActivityProps> = ({ showModal, onClose }) => {
  const searchParams = useSearchParams();
  const owner = searchParams.get('owner') || '';
  const commitSha = searchParams.get('sha') || '';
  const repoName = searchParams.get('repo') || '';
  const dict = useDictionary();

  const { data, isLoading } = useGetCommitsActivities({ repoName, commitSha, owner });
  const [files, setFiles] = useState<{ filename: string; oldCode: string; newCode: string }[]>([]);

  useEffect(() => {
    if (data?.data?.files) {
      const parsedFiles = data.data.files.map((file) => {
        const { oldCode, newCode } = parseDiff(file.patch);
        return {
          filename: file.filename,
          oldCode,
          newCode,
        };
      });
      setFiles(parsedFiles);
    }
  }, [data]);

  const parseDiff = (patch: string) => {
    if (!patch) return { oldCode: '', newCode: '' };

    const oldLines: string[] = [];
    const newLines: string[] = [];

    patch.split('\n').forEach((line) => {
      if (line.startsWith('-') && !line.startsWith('---')) {
        oldLines.push(line.substring(1));
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        newLines.push(line.substring(1));
      } else if (!line.startsWith('@@')) {
        oldLines.push(line);
        newLines.push(line);
      }
    });

    return { oldCode: oldLines.join('\n'), newCode: newLines.join('\n') };
  };

  return (
    <Modal title={dict.activities} open={showModal} onClose={onClose}>
      <div className="flex flex-col w-full h-full gap-6 border-8 dark:border-dark-400 border-light-400 rounded-xl">
        {isLoading ? (
          <CommitActivityPlaceholder />
        ) : (
          files.map((file, index) => (
            <div key={index} className="border-b text-white overflow-auto">
              <h3 className="font-bold text-sm mb-2">{file.filename}</h3>
              <ReactDiffViewer oldValue={file.oldCode} newValue={file.newCode} splitView={true} />
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default CommitActivity;
