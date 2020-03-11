onload=clique;

function pegarPoesia(nome){
    var nomeTratado = nome.toLowerCase().replace(/\s/g, '') ;//aqui vai ser tratada o nome pegado do botão.
    criaAjax(nomeTratado+".xml",getXml,"");//e entao o passaremos para requisição ajax
}

function criaAjax(url,funcao,dados)
{
    let ajax=new XMLHttpRequest(); //cria objeto XMLHttpRequest e guarda dentro da variável
    ajax.onreadystatechange=funcao;//Defini a função que será chamada quando houver mudança no status (ReadyState).
    ajax.open("GET",url,true);
    //passamos o método da requisição(get ou post), onde está o arquivo que no caso é um xml.
    ajax.send();//
}
function getXml(){
    if(this.readyState==4 && this.status==200 )//qunado o status (readyState) for 4
    {
        var rlt = document.getElementById("rlt");
        var retTexto = document.getElementById("texto");
        
        var raiz = this.responseXML.documentElement ;
        var titulo = "<h1>"+raiz.getElementsByTagName("titulo")[0].firstChild.nodeValue+"</h1>";
        var autor = "<p>"+raiz.getElementsByTagName("autor")[0].firstChild.nodeValue+"</p><br/>";
        var img = raiz.getElementsByTagName("imagem")[0].firstChild.nodeValue;
        console.log(titulo,autor,img);

        var arm = "";
        var estrofes = raiz.getElementsByTagName("estrofe");
        var versos = raiz.getElementsByTagName("verso");
    
        for(let estrofe of estrofes){
            var filho = estrofe.firstChild ;
            while(filho!=null){
                if(filho.nodeType == 1){
                    arm += filho.firstChild.nodeValue+"<br>" ;
                }
                filho = filho.nextSibling ;
                
            }   
            arm += "<br>";
            retTexto.innerHTML = arm ; 
            // var versos = firstChild.
            // for(let verso of versos){
            //     arm += verso.firstChild.nodeValue+"<br>";
            // }
            // arm+="<br>";
            
        }
        
        

        rlt.innerHTML = titulo+autor ;
        document.getElementById("img").setAttribute("src",img);
    }
    
    
}


function clique(){
    for(let i=0;i<4;i++)//Aqui ele vai declarar todos os botões, e pegar o que foi clicado
    {
        document.getElementsByTagName("input")[i].onclick = function() //Aqui pegamos os botões
        {
            var nomeMenu = document.getElementsByTagName("input")[i].value; // aqui ele pega o value que está no input
            pegarPoesia(nomeMenu);
        }
    }   
}
