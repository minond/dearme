import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { common } from './styles';
import { get } from './http';

interface Response {
    body: string;
    date: Date;
}

interface Message {
    _id: string;
    user_id: string;
    scheduled: boolean;
    body: string;
    send_date: Date;
    responses: Response[];
}

type State = {
    loading: boolean;
    error: boolean;
    messages: Message[];
};

type Props = {
    guid: string;
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '750px',
        margin: '3em auto',
        padding: '20px',
    }
});

export const MessageComponent = ({ message }: { message: Message }) =>
    <div>
        <h2 className={css(common.med_text)}>{message.body}</h2>
        {message.responses.map((response) =>
            <p className={css(common.small_text)}
                key={response.date.toString()}>{response.body}</p>)}
    </div>;

export class JournalComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            messages: [],
        };
    }

    componentDidMount() {
        this.load(this.props.guid);
    }

    load(guid: string) {
        this.setState({ loading: true, error: false });

        get(`/api/user/${guid}`)
            .then((res) => res.json<Message[]>())
            .then((messages) => this.setState({ messages, loading: false }))
            .catch(() => this.setState({ loading: false, error: true }));
    }

    render() {
        let { messages } = this.state;

        return (
            <div className={css(styles.container)}>
                {messages.map((message) =>
                    <MessageComponent key={message._id} message={message} />)}
            </div>
        );
    }
}
