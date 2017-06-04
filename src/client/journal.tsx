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
        padding: '0 20px 50px 20px',
    },

    header: {
        width: '100%',
        margin: '0',
        padding: '.3em',
        boxSizing: 'border-box',
        textAlign: 'center',
        color: 'white',
        background: 'black',
    },

    message_date: {
        marginTop: '100px',
    },

    message_body: {
        fontStyle: 'italic',
        color: '#b1b1b1',
    },

    message_response: {
        margin: '50px 0',
    },
});

const format_date = (maybe_date: Date | string): string => {
    let date = new Date(maybe_date);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November',
        'December'][date.getMonth()];

    return `${day} ${month}, ${year}`;
};

export const group_by_days = (messages: Message[]): Message[][] =>
    messages.reduce((store, message) => {
        let hash = format_date(message.send_date);

        let curr_list = store[store.length - 1] || [];
        let curr_hash = !curr_list[0] ? null :
            format_date(curr_list[0].send_date);

        if (hash === curr_hash) {
            curr_list.push(message);
        } else {
            store.push([message]);
        }

        return store;
    }, [] as Message[][]);

export const MessageComponent = ({ message }: { message: Message }) =>
    <div>
        <p className={css(common.small_text, styles.message_body)}>{message.body}</p>
        {message.responses.map((response) =>
            <p className={css(common.small_text, styles.message_response)}
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

        let groups = group_by_days(messages);

        return (
            <div>
                <div className={css(common.large_text, styles.header)}>dear {fname.toLowerCase()},</div>
                <div className={css(styles.container)}>
                    {groups.map((group: Message[]) =>
                        <div key={group[0].send_date.toString()}>
                            <div className={css(common.med_text, styles.message_date)}>{format_date(group[0].send_date)}</div>
                            {group.map((message: Message) =>
                                <MessageComponent key={message._id} message={message} />)}
                        </div>)}
                </div>
            </div>
        );
    }
}
