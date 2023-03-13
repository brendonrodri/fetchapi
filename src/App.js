import React from "react"
import "./App.css"
export default class App extends React.Component{
  
  state={
    apiPosts:[], //criamos uma array vazia para receber os dados da api
    apiPhotos:[] //criamos uma array vazia para receber as photos da api
  }
  componentDidMount(){ //método de ciclo de vida, executa uma função quando o componente for montando ou seja, quando a redenrização acontecer 
    this.getApi() //função de buscar os dados da api
  }

  getApi = async () =>{ //função assíncrona, espera algo acontecer para ser executada
      const postResponse = fetch(`https://jsonplaceholder.typicode.com/posts`) //const que faz a requisição da api de post
      const photosReponse = fetch(`https://jsonplaceholder.typicode.com/photos`) // faz a requisição da api de photos
      const [apiPosts, apiPhotos] = await Promise.all( //recebe as arrays reversadas para as apis...
        [postResponse, photosReponse] //executa o fetch das apis, ou seja, faz a requisição
      )
      const postJson = await apiPosts.json() //converte os dados para json (não entendi muito bem)
      const photosJson = await apiPhotos.json() //mesma coisa que a const anterior 

      const newData = postJson.map((post, index)=>{ //faz um map da array de posts e concatena com a array de photos, buscando apenas a propriedade responsável pela url da imagem
          return {...post, cover: photosJson[index].url }
      })

      this.setState({apiPosts: newData})  //atualiza o estado com os dados da api
  }

  render(){
    return(
      <>
        {this.state.apiPosts.map(post => ( //map com os dados da api para mostrar esses na tela
          <article key={post.id}>
            <img src={post.cover} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </>
    )
  }
}