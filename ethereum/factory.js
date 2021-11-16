import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x443F414b04db4340a7da5B1e4438CF7a25BfC3C1'
);

export default instance;
