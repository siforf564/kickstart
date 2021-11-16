import React, { Component } from 'react'
import { Grid, Card, Button } from 'semantic-ui-react'
import ContributionForm from '../../components/contributionFrom'
import Layout from '../../components/layout'
import getCampaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import { Link } from '../../routes'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = getCampaign(props.query.address)

        const summary = await campaign.methods.getSummary().call()

        console.log(summary)
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            managerAddress: summary[4],
            address: props.query.address
        }
      }

    renderCards() {
        const {
            balance,
            managerAddress,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props

        const items = [
            {
                header: managerAddress,
                meta: 'Manager',
                description: 'Address of the manager who created this campaign. Only him can create a request to withdraw money.',
                style: { overflowWrap: 'break-word' },
                color: 'blue'
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'Minimum contribution needed to become an approver of this campaign.',
                style: { overflowWrap: 'break-word' },
                color: 'blue'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'Number of request to withdraw money created by the manager of this campaign. Each request must be approve by approvers.',
                style: { overflowWrap: 'break-word' },
                color: 'blue'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have contributed to this campaign.',
                style: { overflowWrap: 'break-word' },
                color: 'blue'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance (eth)',
                description: 'Balance of this campaign. The manager need to create a request to spend this money.',
                style: { overflowWrap: 'break-word' },
                color: 'blue'
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return (
        <Layout>
        <h3>Campaign Show</h3>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributionForm address={this.props.address} minimumContribution={this.props.minimumContribution}/>                 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button primary>View Requests</Button>
                        </a>
                    </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Layout>) 
    }
}

export default CampaignShow