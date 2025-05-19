const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.json());

let habits = [
  { id: 1, name: "Exercicio", frequencia: "Diario", status: "Completo" },
  { id: 2, name: "Ler", frequencia: "Diario", status: "Pendente" },
  { id: 3, name: "Meditar", frequencia: "Semanalmente", status: "Completo" },
];

app.get("/habits", (req, res) => {
  res.json(habits);
});

app.post("/habits", (req, res) => {
  const { name, frequencia, status } = req.body;
  const newHabit = { id: habits.length + 1, name, frequencia, status };
  habits.push(newHabit);
  res.status(201).json('Novo hábito criado.');
});

app.put('/habits/:id', (req, res) => {
    const { id } = req.params;
    const { name, frequencia, status } = req.body;
    const habit = habits.find((t) => t.id === parseInt(id));

    if(habit){
        if(name) habit.name = name;
        if(frequencia) habit.frequencia = frequencia;
        if(status) habit.status = status;
        res.status(202).json({'Hábito atualizado': habit});
    }else{
        res.status(404).json('Hábito não encontrado');
    }
});

app.delete('/habits/:id', (req, res) => {
    const { id } = req.params;
    habitExists = habits.find(t => t.id === parseInt(id));
  if (!habitExists) {
    res.status(404).json({ message: "Tarefa não encontrada" });
  } else {
    habits = habits.filter(t => t.id !== parseInt(id));
    res.status(200).send({ message: "Deletada com sucesso" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});