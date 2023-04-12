import { useState, useEffect } from "react";
function App() {
    const [tarefas, setTarefa] = useState([]);
    const [input, setInput] = useState("");
    function excluirTarefa(id) {
        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefa(novasTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
    function adicionar() {
        const novaTarefa = {
            id: Date.now(),
            nome: input
        };
        setTarefa([...tarefas, novaTarefa]);
        setInput("");
    }
    useEffect(() => {
        const tarefasStorage = localStorage.getItem("tarefas");
        if (tarefasStorage) {
            setTarefa(JSON.parse(tarefasStorage));
        }
    }, []);
    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
    }, [tarefas]);
    return (<div className="App">
      <h1>Tarefas</h1>

      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button type="button" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      {tarefas.map((tarefa) => (<div key={tarefa.id}>
          <span> {tarefa.nome}</span>
          <button onClick={() => excluirTarefa(tarefa.id)}>X</button>
        </div>))}
    </div>);
}
export default App;
