import { useState, useEffect } from "react";

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [input, setInput] = useState("");

  function excluirTarefa(index) {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefa(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
  }

  useEffect(() => {
    const tarefasStorage = localStorage.getItem("tarefas");
    if (tarefasStorage) {
      setTarefa(JSON.parse(tarefasStorage)); 
    }
  }, []);

  useEffect(() => {
     
    if(tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);

  function adicionar() {
    setTarefa([...tarefas, input]);
    setInput("");
  }

  return (
    <div className="App">
      <h1>Tarefas</h1>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      {tarefas.map((tarefa, index) => (
        <div key={tarefa}>
          <span> {tarefa}</span>
          <button onClick={() => excluirTarefa(index)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;
