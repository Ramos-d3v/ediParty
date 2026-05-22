
const time = `enzo ramos, fiap
diego bissochi, unesp 
adriano rufino, unesp 
matteo Rodrigues, uniso
whayke senna, uniso 
vinicius kobo, mackenzie 
henrique adriane, objetivo 
yukio moser, objetivo 
eduardo rodrigues, roça 
pedro dos anjos, albert einstein 
lucas condomínio, aurora
pedro nogueira, obra
gustavo forsseto, objetivo 
enzo salerno, objetivo
otávio saraiva, uniso
nicolas bezerra, tenente 
nicolas márcio, uniso 
bruninho, uniso
caue atui, anime
gabriel makoto , gakko
koba pereira, fut
niko furuiti, australia
fernando suguimoto, fgv
felipe pontes, anglo
samuel tiktok, bolivia
murilo central , usp`;

const pessoas = time.split('\n').map((linha, index) => {
    // Separa pelo vírgula e remove espaços extras com trim()
    const [ nome, time] = linha.split(',');
    return {
        id: index + 1,
        nome: nome.trim(),
        time: time.trim(),
         
    };
});

console.log(pessoas);


const imPar = pessoas.filter(pessoa => pessoa.id % 2 !== 0);

console.log(imPar);



