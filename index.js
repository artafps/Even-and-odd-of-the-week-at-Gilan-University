// env
require("dotenv").config();
const path = require("path");
const connectDB = require("./db");
const lg = console.log;
// pkg
const axios = require("axios");
const fs = require('fs');
const { Telegraf } = require("telegraf");

const { TOKEN } = process.env;

connectDB()
const Start = require("./mod/Start");
const myBot = new Telegraf(TOKEN);

myBot.start(async ctx => {
    const projectDir = __dirname;
    myBot.telegram.setMyCommands([
        {
            command: 'start',
            description: 'تاریخ و هفته آموزشی ',
        }
        , {
            command: 'powerby',
            description: 'سازنده : artafps',
        }
    ]);
    const UserStart = await Start.findOne({ Tid: String(ctx.message.from.id) })
    if (UserStart) {
    } else {
        const data = {
            Tid: ctx.message.from.id,
            global: '0',
        }
        await Start.startValid(data)
        await Start.create(data)
    }


    // مسیر فایل مورد نظر
    const filePath = projectDir + '/file.txt';
    // چک کردن وجود فایل
    fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (err) {
            const response = await axios.get('https://zojfard.ir/u-guilan')
            const zojfard = response.data.split('style="font-size: 5rem">')[1].split('</p></div>')[0]
            const date = response.data.split('<p class="font-size-h6 text-dark-75 font-weight-bolder">')[1].split('</p></div>')[0]
            let text = 'سلام دوست من 👋\n\n'
            text += 'تاریخ امروز ::'
            text += '\n\n' + date + '\n\n'
            text += `این هفته ${zojfard} آموزشی است.`
            text += '\n\n\n راهنما » \n /start تاریخ و هفته آموزشی \n /powerby سازنده : ARTAFPS \n .'
            ctx.reply(text, {
                reply_to_message_id: ctx.message.message_id
            })
            fs.writeFile(filePath, 'DOT \n' + text + '\n DOT \n' + new Date(), (err) => {
                if (err) {
                    return;
                }
            });
        } else {
            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    return;
                }
                // ctx]c
                const date = new Date(data.split('DOT')[2].split('\n')[1])
                if ((date < new Date() - 28800000)) {
                    const response = await axios.get('https://zojfard.ir/u-guilan')
                    const zojfard = response.data.split('style="font-size: 5rem">')[1].split('</p></div>')[0]
                    const date = response.data.split('<p class="font-size-h6 text-dark-75 font-weight-bolder">')[1].split('</p></div>')[0]
                    let text = 'سلام دوست من 👋\n\n'
                    text += 'تاریخ امروز ::'
                    text += '\n\n' + date + '\n\n'
                    text += `این هفته ${zojfard} آموزشی است.`
                    text += '\n\n\n راهنما » \n /start تاریخ و هفته آموزشی \n /powerby سازنده : ARTAFPS \n .'
                    ctx.reply(text, {
                        reply_to_message_id: ctx.message.message_id
                    })
                    fs.writeFile(filePath, 'DOT \n' + text + '\n DOT \n' + new Date(), (err) => {
                        if (err) {
                            return;
                        }
                    });
                } else {
                    ctx.reply(data.split('DOT')[1], {
                        reply_to_message_id: ctx.message.message_id
                    })
                }
            });
        }
    });
})
myBot.command('powerby', async (ctx) => {
    if (ctx.message && ctx.message.chat && ctx.message.chat.type === 'private') {
        const web_link = "https://github.com/artafps";
        ctx.reply('DESIGN AND BACK-END POWER BY : ARTAFPS (ARTA FALLAHPOOR) 🧑‍💻 \n :🔗:LINK:🔗: \n https://github.com/artafps', {
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: [[{
                    text: "web app", web_app: { url: web_link }
                }]]
            }
        })
    }else{
        ctx.reply('DESIGN AND BACK-END POWER BY : ARTAFPS (ARTA FALLAHPOOR) 🧑‍💻 \n :🔗:LINK:🔗: \n https://github.com/artafps')
    }
})

myBot.launch();