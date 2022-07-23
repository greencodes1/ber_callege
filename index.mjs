import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from '../build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
const Bobs = await stdlib.newTestAccounts(10, startingBalance);
console.log('Hello Alice and Bobsssssss')
const ctcAlice = accAlice.contract(backend);
const accepted_list = []
const rejected_list = []
const optin_acc = async (bobs) => {
    try {
        const who = bobs
        const acc = who.getAddress()
        const ctc = who.contract(backend, ctcAlice.getInfo());
        await ctc.apis.Bob_accs.optin_acc();
        accepted_list.push(acc)
    } catch (error) {
        rejected_list.push(bobs.getAddress())
    }

}

await Promise.all([
    ctcAlice.p.Alice({
        start_program: () => {
            console.log('Alice is ready to accept connection')
        }
    }),
    await optin_acc(Bobs[0]),
    await optin_acc(Bobs[1]),
    await optin_acc(Bobs[2]),
    await optin_acc(Bobs[3]),
    await optin_acc(Bobs[4]),
    await optin_acc(Bobs[5]),
    await optin_acc(Bobs[6]),
    await optin_acc(Bobs[7]),
    await optin_acc(Bobs[8]),
    await optin_acc(Bobs[9]),
]);

console.log(`Accepted Lists : ${accepted_list}`)
console.log(`Rejected Lists : ${rejected_list}`)
process.exit()
