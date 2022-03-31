import { ICommand } from "wokcommands";

export default {
    category: 'testing',
    description: 'pongalicious',
    testOnly: true,
    callback: ({}) => {
        return 'pong!'
    }
} as ICommand