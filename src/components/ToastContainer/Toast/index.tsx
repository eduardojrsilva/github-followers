import React, { useEffect } from 'react';
import { CheckCircle, Info, WarningCircle, XCircle } from 'phosphor-react';
import { SpringValue } from 'react-spring';

import { ToastMessage, useToast } from '../../../providers/Toast';

import { Container } from './styles';

interface ToastStyle {
  right: SpringValue<string>;
  opacity: SpringValue<number>;
}

interface ToastProps {
  message: ToastMessage;
  style: ToastStyle;
}

const icons = {
  info: <Info size={24} />,
  error: <WarningCircle size={24} />,
  success: <CheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container $type={message.type} $hasDescription={!!message.description} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <XCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
