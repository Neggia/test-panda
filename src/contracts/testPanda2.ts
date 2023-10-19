import {
    method,
    prop,
    SmartContract,
    hash256,
    assert,
    SigHash,
    UTXO,
    bsv
} from 'scrypt-ts'

import type { ByteString } from 'scrypt-ts';

export class TestPanda2 extends SmartContract {
    @prop(true)
    count: bigint

    @prop(true)
    timestampFrom: bigint // Timestamp window in which the price target needs to be reached.
    @prop(true)
    timestampTo: bigint

    constructor(count: bigint) {
        super(count)
        this.count = count
        this.timestampFrom = 0n
        this.timestampTo = 0n
    }

    @method(SigHash.SINGLE)
    public increment() {
        this.count++

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
        // verify current tx has this single output
        assert(this.ctx.hashOutputs === hash256(output), 'hashOutputs mismatch')
    }

}
