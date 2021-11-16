import { Router } from "../routes"
import React, { Component } from "react"
import { Form, Input, Message, Button } from "semantic-ui-react"
import getCampaign from "../ethereum/campaign"
import web3 from "../ethereum/web3"

class ContributionForm extends Component {
    state = {
        values: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const campaign = getCampaign(this.props.address)

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false, value: ''})
    }

    render () {
        const minimumContribution = web3.utils.fromWei(
                                    web3.utils.toBN(this.props.minimumContribution), 'ether')

        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.setState.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        placeholder={minimumContribution}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>
                <Message
                    error
                    header='Oops!'
                    content={this.state.errorMessage}
                />
                <Button primary loading={this.state.loading}>
                    Contribute
                </Button>
            </Form>
        )
    }
}

export default ContributionForm

