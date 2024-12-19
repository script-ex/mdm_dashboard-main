import { useEffect, useRef, useState } from 'react';

export function AutoGrowingInput(props: any) {
  const [text, setText] = useState(props.value || '• ');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [ref.current]);

  const handleBulletPoints = (e) => {
    if (props.onKeyUp) {
      props.onKeyUp(e);
    }

    if (!props.noBullet && e.key === 'Enter') {
      // find index of the current key and add bullet point to it
      const index = e.target.selectionStart;
      const newText = `${text.slice(0, index)}• ${text.slice(index)}`;
      setText(newText);
      e.target.value = newText;
      e.target.selectionStart = index + 2;
      e.target.selectionEnd = index + 2;
    }
  };

  return (
    <textarea
      ref={ref}
      {...props}
      value={text}
      rows="1"
      style={{ ...props.style, height: 'auto', resize: 'none', border: 'none' }}
      onChange={(e) => {
        setText(e.target.value);
        if (props.onChange) {
          props.onChange(e);
        }
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      }}
      onKeyUp={handleBulletPoints}
    />
  );
}
