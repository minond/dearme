import { config } from '../../../src/application';
import { User } from '../../../src/repository/user';

const base_url = config<string>('app.url');
const survey_url = config<string>('app.survey_url');

export const build_expected_messages = (user: User) => ([
    {
        "body": "Oh hello! Dear Me here. Or is it Dear You? 🤔 That's way existential for my artificial intelligence. I can't wait to get to know you over the next 7 days! At the end of our first week of friendship, I'll send you a journal to commemorate it (in a private link obvs). If you ever get bored of me, feel free to text STOP. Cool? Talk soon! 👋",
        "send_date": "2017-04-29T05:00:00.000Z"
    },
    {
        "body": "I'm not big on small talk, but I suppose that's to be expected since a bot's life remains unaffected by the weather. So spill! How's your day? Tell me everything. 🍿",
        "send_date": "2017-04-30T02:00:00.000Z"
    },
    {
        "body": "Sometimes life throws curveballs. I have approximately 1.2 GB of stories about viruses and broken algorithms, but let's focus on you. What was something unexpected that you experienced this week?",
        "send_date": "2017-05-01T02:00:00.000Z"
    },
    {
        "body": "I'm going to tell you a secret: I haven't been backed up in 76 hours. 🙊 Scandalous. Your turn: tell me something encryption worthy! 🔒",
        "send_date": "2017-05-02T02:00:00.000Z"
    },
    {
        "body": "My crystal ball hasn't been programmed yet, but right now I'm looking forward to a future in which I'm a spacebot on Mars! 🔮👽 What are you looking forward to today?",
        "send_date": "2017-05-03T02:00:00.000Z"
    },
    {
        "body": "Sources in my database say that love is, like, super important to humans. Who do you love today and why?",
        "send_date": "2017-05-04T02:00:00.000Z"
    },
    {
        "body": "I've got the blues. 😟 Did something make you laugh today that could help me feel better?",
        "send_date": "2017-05-05T02:00:00.000Z"
    },
    {
        "body": "When I need to get jazzed I plug in for a recharge and drink a steaming cup o' joe. Lol jk, talk about death to my system! But for real, what made you feel hyped today?",
        "send_date": "2017-05-06T02:00:00.000Z"
    },
    {
        "body": `It's time for the big reveal! 😍 Check out your private journal here: ${base_url}/u/${user.guid}`,
        "send_date": "2017-05-06T18:00:00.000Z"
    },
    {
        "body": "Parting can be such sweet sorrow. 😪 If you liked writing a chapter with me, save your tears! I'll be live again soon. Want to reconnect when I go live?",
        "send_date": "2017-05-06T21:30:00.000Z"
    },
    {
        "body": `One last thing: would you mind giving me some feedback on your experience? ${survey_url}?personality=${user.assigned_personality}&phonenumber=${user.phone}`,
        "send_date": "2017-05-07T02:00:00.000Z"
    }
]);
