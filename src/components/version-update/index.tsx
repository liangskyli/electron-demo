import { Button, Modal, Progress } from 'antd';
import { useEffect } from 'react';

const VersionUpdate = () => {
  useEffect(() => {
    const { watchVersionUpdateMsg, confirmDownload, confirmUpdate } =
      window.electronAPI;
    let progressModal: ReturnType<typeof Modal.info> | undefined;
    watchVersionUpdateMsg((arg) => {
      switch (arg.state) {
        case -1:
          Modal.error({
            title: `更新失败，原因:${arg.message}`,
          });
          break;
        case 0:
          // 正在检查更新
          break;
        case 1:
          Modal.confirm({
            title: '提示',
            content: `检查到新版本V${arg.message}，是否更新?`,
            onOk() {
              confirmDownload();
            },
          });
          break;
        case 2:
          Modal.success({
            content: '已经是新版本',
          });
          break;
        case 3:
          if (!progressModal) {
            const percent = +arg.message.percent.toFixed(0);
            progressModal = Modal.info({
              content: <Progress percent={percent} />,
            });
          } else {
            const percent = +arg.message.percent.toFixed(0);
            progressModal.update((prevConfig: any) => {
              return {
                ...prevConfig,
                content: <Progress percent={percent} />,
              };
            });
          }
          break;
        case 4:
          progressModal?.destroy();
          confirmUpdate();
          break;
      }
    });
  }, []);

  const onCheckUpdate = () => {
    const { checkUpdate } = window.electronAPI;
    checkUpdate();
  };

  return (
    <>
      <Button onClick={onCheckUpdate}>check-update</Button>
    </>
  );
};
export default VersionUpdate;
