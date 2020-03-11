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
    if(this.readyState==4 )//qunado o status (readyState) for 4
    {
        if(this.status==200)//qunado retornar 200 é porque deu certo. 
        {
            var rlt = document.getElementById("rlt");
            var raiz = this.responseXML.documentElement;
            var filhos = raiz.firstChild ;
            var ret = "";
            var cont = 0 ;
            while(filhos!=null){
                if(filhos.nodeType==1){
                    ret += "<b>"+filhos.firstChild.nodeValue+"<br/></b>";
                    cont++;
                    if(cont==3){
                        document.getElementById("img").setAttribute("src",filhos.firstChild.nodeValue);
                    }
                }
                filhos = filhos.nextSibling ;
            }
            var raizTexto = raiz.childNodes[7] ;
            var estrofes = raizTexto.firstChild ;

            var versos ;
            while(estrofes!=null){
                if(estrofes.nodeType==1){
                    versos = estrofes.firstChild ;
                    while(versos!=null){
                        if(versos.nodeType==1){
                            ret += versos.firstChild.nodeValue+"<br>";
                        }
                        versos = versos.nextSibling ;
                    }    
                    ret += "<br/>";
                }
                estrofes = estrofes.nextSibling ;
            }
            rlt.innerHTML = ret ;
        }
        else
            console.log("Ocorreu um erro")
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


