import { createServer, Model } from "miragejs"

export default function server () {
  createServer({
    models: {
      reminder: Model,
    },

    seeds(server) {
      server.create("reminder", { text: "Walk the dog", completed:0, id: 1})
      server.create("reminder", { text: "Take out the trash", completed:0, id: 2 })
      server.create("reminder", { text: "Work out", completed:0, id: 3 })
    },

    routes() {
      //get all todos
      this.get("/api/reminders", (schema) => {
        return schema.reminders.all()
      })

      //create a todo
      this.post("/api/reminders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.reminders.create(attrs)
      })

      //delete a todo
      this.delete("/api/reminders/:id", (schema, request) => {
        let id = request.params.id
      
        return schema.reminders.find(id).destroy()
      })

      //delete ao todos
      this.post("/api/reminders/all", (schema) => {  

        return schema.db.reminders.remove({completed: 1}); 
      })
      
      this.put("/api/reminders/:id", (schema, request) => {
        let id = request.params.id
        let completed = JSON.parse(request.requestBody)
      
        return schema.reminders.find(id).update(completed)
      })
    },
  })
}

server()