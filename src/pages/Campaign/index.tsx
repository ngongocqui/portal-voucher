import { PageContainer } from '@ant-design/pro-layout';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

const Campaign = () => {
  return (
    <PageContainer>
      <CampaignForm />
      <CampaignList />
    </PageContainer>
  );
};

export default Campaign;
