//Questa classe si salva e gestisce i blocchi nel caso qualcuno voglia fare un bruteforce per scoprire una password
class BruteforceBlocks{

    Blocks; //Lista di blocchi

    TimeResetBlock = 30*60;  //Tempo necessario per annullare la catena di blocchi bruteforce (dove il timer aumenta ad ogni attivazione)

    CycleAttemps = 5; //Tentativi permessi prima che si attiva il prossimo blocco

    constructor(){ this.Blocks = {}; }

    async GetBlock(IPv4, port){

        return this.Blocks[IPv4+":"+port];

    }

    async BlockIsActive(IPv4, port){

        let block = await this.GetBlock(IPv4, port);

        console.log(block);
        console.log(Date.now())

        if(block === undefined || block.ExpiredTimeBlock < Date.now()) return false;
        return true;

    }

    async AddSignal(IPv4, port){

        //Cerco il blocco
        let block = await this.GetBlock(IPv4, port);

        //Se il blocco non esiste lo aggiungo
        if(block === undefined){
            this.Blocks[IPv4+":"+port] = new Block(Date.now(), this.CycleAttemps-1);
            console.log("Aggiungo il blocco "+IPv4+":"+port);
        }
        else{

            console.log("Il blocco già esiste "+IPv4+":"+port);

            //Se il blocco è attivo non faccio niente
            if(block.ExpiredTimeBlock > Date.now()){
                return;
            }

            //Se quella macchina ha ancora dei tentativi, gli e ne tolgo uno
            else if(block.RemainAttemps > 1){
                block.RemainAttemps -= 1;
                console.log("Tentativi rimasti ("+IPv4+":"+port+"): "+block.RemainAttemps);
            }

            //Se i tentativi sono finiti, attivo il time di blocco
            else{

                console.log("Attivo il blocco ("+IPv4+":"+port+")");

                block.ExpiredTimeBlock = Date.now() + (block.BlockLevel*block.MultiplyMinute*60*1000);
                block.BlockLevel += 1;
                block.RemainAttemps = this.CycleAttemps;

            }

        }

        console.log("");
 
    }

    async RemoveExpiredBlock(){

        //Tolgo tutti blocchi scaduti da un tot di tempo (questo tot di tempo è TimeResetBlock)
        //this.Blocks = this.Blocks.filter((B) => (B.ExpiredTimeBlock >= Date.now()+this.TimeResetBlock));

    }

}

//Questa classe rappresenta un blocco, ogni volta
class Block{
    
    ExpiredTimeBlock; //Tempo di attesa di blocco (se è null il blocco non c'è)
    RemainAttemps; //Tentativi rimasti prima che si attivi il prossimo blocco
    BlockLevel = 1; //Rappresenta il livello di blocco, più è alto e più il prossimo blocco impiegha più tempo
    MultiplyMinute = 5; //Rappresenta i minuti da dare (moltiplicato al BlockLevel) al prossimo blocco

    constructor(ExpiredBlock, RemainAttemps){

        this.ExpiredTimeBlock = ExpiredBlock;
        this.RemainAttemps = RemainAttemps;

    }

}

module.exports = BruteforceBlocks;