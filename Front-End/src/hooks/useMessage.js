import { message } from 'antd';
import { useCallback } from 'react';

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback((type, content) => {
    messageApi.open({
      type,
      content,
    });
  }, [messageApi]);

  const success = (content) => showMessage('success', content);
  const error = (content) => showMessage('error', content);
  const warning = (content) => showMessage('warning', content);

  return { success, error, warning, contextHolder };
};

export default useMessage;
