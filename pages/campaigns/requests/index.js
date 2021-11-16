import React, { Component } from "react";
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import getCampaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";

class RequestIndex extends Component {
    static async getInitialProps(props){
        const { address } = props.query
        const campaign = getCampaign(address)
        const requestsCount = await campaign.methods.getRequestsCount().call()
        const approversCount = await campaign.methods.approversCount().call()

        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )

        return { address, requests, requestsCount, approversCount }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
                />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table

        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}`}>
                    <a>
                        <Button content='Back'/>
                    </a>
                </Link>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button
                            content='Create Request'
                            icon='add circle'
                            floated='right' 
                            style={{ marginBottom: 10 }}
                            primary/>
                    </a>
                </Link>
                <Table color='blue'>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestsCount} requests</div>
            </Layout>
        )
    }
}

export default RequestIndex