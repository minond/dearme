import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { common } from './styles';
import { get } from './http';

interface User {
    fname: string;
}

interface ServerResponse {
    user: User;
    messages: Message[];
}

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
    user: User;
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
    },

    header: {
        width: '100%',
        margin: '0',
        padding: '.3em',
        boxSizing: 'border-box',
        marginBottom: '50px',
        textAlign: 'center',
        color: 'white',
        background: 'black',
    },
});

const get_date_hash = (date: Date | string): string => {
    let offset = 3600000 * 6;
    let odate = new Date(date);
    return new Date(odate.valueOf() - offset).toDateString();
}

export const group_by_days = (messages: Message[]): Message[][] =>
    messages.reduce((store, message) => {
        let hash = get_date_hash(message.send_date);

        let curr_list = store[store.length - 1] || [];
        let curr_hash = !curr_list[0] ? null :
            get_date_hash(curr_list[0].send_date);

        if (hash === curr_hash) {
            curr_list.push(message);
        } else {
            store.push([message]);
        }

        return store;
    }, [] as Message[][]);

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
            user: { fname: '' },
            messages: [],
        };
    }

    componentDidMount() {
        this.load(this.props.guid);
    }

    load(guid: string) {
        this.setState({ loading: true, error: false });

        get(`/api/user/${guid}`)
            .then((res) => res.json<ServerResponse>())
            .then(({user, messages}) => this.setState({ user, messages, loading: false }))
            .catch(() => this.setState({ loading: false, error: true }));
    }

    render() {
        let { messages = [], user } = this.state;
        let { fname = 'you' } = user;

        // the last three messages are not journal messages. don't show them
        messages.pop();
        messages.pop();
        messages.pop();

        return (
            <div>
                <div className={css(common.large_text, styles.header)}>dear {fname.toLowerCase()},</div>
                <div className={css(styles.container)}>
                    {messages.map((message) =>
                        <MessageComponent key={message._id} message={message} />)}
                </div>
            </div>
        );
    }
}
