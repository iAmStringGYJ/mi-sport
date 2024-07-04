import ora from 'ora'
import dayjs from 'dayjs'
import ZeepLife from './modules/ZeppLife'
import { randomFullClose } from './utils'
import { isEmail, isPhone } from './utils/validate'

/* ---------------------------------- 执行刷步 ---------------------------------- */
;(async () => {
  const spinner = ora('正在刷步中...').start()
  try {
    // 从环境变量中获取账号和密码
    const account = process.env.ACCOUNT
    const password = process.env.PASSWORD
    const step = randomFullClose(18650, 25906) // 根据指定范围生成随机步数

    if (!account || !password) {
      throw new Error('账号或密码未设置')
    }

    if (!isPhone(account) && !isEmail(account)) {
      throw new Error('请检查账号是否为手机号或邮箱')
    }

    const zeppLife = new ZeepLife(account, password, step)
    const data = await zeppLife.main()
    spinner.succeed(`${data.date} ${data.account} 刷步完成 ${data.step}`)
  } catch (error) {
    spinner.fail(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} [Error]: ${error.message || '未知异常'}`)
  }
})()
