import React, { FC, useMemo } from 'react';
import { EditorProps } from 'src/models/common/editor';
import dynamic from 'next/dynamic';
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
import sanitizeHtml from 'sanitize-html';
import classNames from 'classnames';

const Editor: FC<EditorProps> = ({
  options: inputOptions,
  className: inputClassName,
  toolbar = true,
  ...props
}) => {
  const className = classNames('MarkdownEditor', {
    hideToolbar: !toolbar,
    [inputClassName as string]: inputClassName,
  });

  const options = useMemo(
    () => ({
      ...inputOptions,
      spellChecker: false,
      renderingConfig: {
        sanitizerFunction: (html: string) => sanitizeHtml(html),
      },
    }),
    []
  );

  return <SimpleMdeReact className={className} options={options} {...props} />;
};

export default Editor;
