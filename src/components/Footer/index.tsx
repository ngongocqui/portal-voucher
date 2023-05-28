import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import { querySystem } from '@/components/Footer/service';

const Footer: React.FC = () => {
  const [system, setSystem] = React.useState({
    freeMem: '0',
    totalMem: '0',
    freeDisk: '0',
    totalDisk: '0',
  });
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Produced by animefree.online',
  });

  React.useEffect(() => {
    const id = setInterval(async () => {
      const data = await querySystem();
      setSystem(data);
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <DefaultFooter copyright={`2020 ${defaultMessage}`} links={[]} />;
      <div className="fixed bottom-0 p-2 bg-black	text-white opacity-50">
        <div className="flex space-x-4">
          <div>{`Free memory: ${system.freeMem}`}</div>
          <div>{`Total memory: ${system.totalMem}`}</div>
          <div>{`Free disk: ${system.freeDisk}`}</div>
          <div>{`Total disk: ${system.totalDisk}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
