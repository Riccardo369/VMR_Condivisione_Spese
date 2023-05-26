class BruteforceBlock{

    Blocks;

    TimeDiffDeleteBlock; //Tempo che serve far passare per eliminare un blocco. Si conta dall' ultima volta che si è sbloccato quel blocco

    constructor(){ this.Blocks = []; }

}

class Block{

    SecondToLock;

    MaxAttemps;

    constructor(IPv4, Port, Level, TimeUnlocked){

    }

    async GetBlock(IPv4, Port){

    }

    async addSignal(IPv4, Port){

    }

    async RemoveBlock(IPv4, Port){

    }

    async RemoveExpiredBlock(IPv4, Port){

    }


}