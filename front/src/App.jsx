import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/tickets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar chamados')
        }
        return response.json()
      })
      .then((data) => setTickets(data))
      .catch(() => setError('Nao foi possivel carregar os chamados.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <h1>Lista de Chamados</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="erro">{error}</p>}

      {!loading && !error && tickets.length === 0 && (
        <p>Nenhum chamado encontrado.</p>
      )}

      {!loading && !error && tickets.length > 0 && (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Codigo</th>
                <th>Assunto</th>
                <th>Descricao</th>
                <th>Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.code}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default App
