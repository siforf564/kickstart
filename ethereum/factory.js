import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3aFa5CB639318A75753132bA2F135Cb135978734'
);

export default instance;
