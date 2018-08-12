import React from 'react';
import { Alert } from 'antd';

const onClose = function(e) {
  console.log(e, 'I was closed.');
};

export default ({ error }) => (
  <div>
    {!error ? (
      !null
    ) : (
      <Alert
        message="Ошибка"
        description="Вы не ввели имя исполнителя"
        type="error"
        closable
        onClose={onClose}
        style={{ marginBottom: '20px' }}
      />
    )}
  </div>
);
