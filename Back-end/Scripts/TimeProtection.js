//Questa classe si salva e gestisce i blocchi nel caso qualcuno voglia fare un bruteforce per scoprire una password
class BruteforceBlocks{

    Blocks; //Lista di blocchi

    TimeResetBlock = 30*60;  //Tempo necessario per annullare la catena di blocchi bruteforce (dove il timer aumenta ad ogni attivazione)

    CycleAttemps = 5; //Tentativi permessi prima che si attiva il prossimo blocco

    constructor(){ this.Blocks = []; }

    async GetBlock(IPv4, port){

        for(let B in this.Blocks) if(B.IPv4 === IPv4 && B.Port === port) return B;
        return null;

    }

    async BlockIsActive(IPv4, port){

        let Block = await this.GetBlock(IPv4, port);
        if(Block === null || Block.ExpiredTimeBlock === null) return false;
        return true;

    }

    async AddSignal(IPv4, port){

        //Cerco il blocco
        let Block = this.GetBlock(IPv4, port);

        //Se il blocco non esiste lo aggiungo
        if(Block === null) this.Blocks.push(new Block(IPv4, port, Date.now(), this.CycleAttemps));
        else{

            //Se il blocco è attivo non faccio niente
            if(Block.ExpiredTimeBlock !== null) return;

            //Se quella macchina ha ancora dei tentativi, gli e ne tolgo uno
            else if(Block.RemainAttemps > 0) Block.RemainAttemps -= 1;

            //Se i tentativi sono finiti, attivo il time di blocco
            else{

                Block.RemainAttemps = Date.now() + (Block.BlockLevel*MultiplyMinute);
                Block.BlockLevel += 1;

            }

        }
 
    }

    async RemoveExpiredBlock(){

        //Tolgo tutti blocchi scaduti da un tot di tempo (questo tot di tempo è TimeResetBlock)
        this.Blocks = this.Blocks.filter((B) => (B.ExpiredTimeBlock >= Date.now()+this.TimeResetBlock));

    }

}

//Questa classe rappresenta un blocco, ogni volta
class Block{

    IPv4; //Indirizzo IPv4
    Port; //Porta
    ExpiredTimeBlock; //Tempo di attesa di blocco (se è null il blocco non c'è)
    RemainAttemps; //Tentativi rimasti prima che si attivi il prossimo blocco
    BlockLevel = 1; //Rappresenta il livello di blocco, più è alto e più il prossimo blocco impiegha più tempo
    MultiplyMinute = 5; //Rappresenta i minuti da dare (moltiplicato al BlockLevel) al prossimo blocco

    constructor(IPv4, port, ExpiredBlock, RemainAttemps){

        this.IPv4 = IPv4;
        this.Port = port;
        this.ExpiredTimeBlock = ExpiredBlock;
        this.RemainAttemps = RemainAttemps;

    }

}

module.exports = BruteforceBlocks;