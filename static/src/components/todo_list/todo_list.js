/** @odoo-module **/

import { registry } from '@web/core/registry';
import { useService } from "@web/core/utils/hooks";

const { Component, useState, onWillStart, useRef } = owl;

export class TodoListContainer extends Component {
    setup() {
        this.state = useState({
            task: {name:'', color:'#FFFFFF', completed:false},
            taskList: [],
            isEdit: false,
            activeId: false,
        })

        this.orm = useService('orm')
        this._searchInputRef = useRef('search-input')
        this.model = 'todo.list'

        onWillStart( async ()=>{ await this.getAllTasks() })
    }

    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ['name', 'color', 'completed'])
    }

    async searchTasks(){
        const text = this._searchInputRef.el.value
        this.state.taskList = await this.orm.searchRead(this.model, [['name','ilike', text]], ['name', 'color', 'completed'])
    }

    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    }

    editTask(task){
        console.log('editTask : ', task)
        this.state.activeId = task.id
        this.state.isEdit = true
        this.state.task = {...task}
        // or
        // this.state.task = {name: task.name, color: task.color, completed: task.completed}
    }

    async saveTask(){
        // we can semplify the code to this because task state contains the same fields we want to send to the model
        //  but we must not add any key as column the does not exist in the model todo.list.
        // await this.orm.create(this.model, [{name: this.state.task.name, color: this.state.task.color, completed: this.state.task.completed}])
        if (!this.state.isEdit){
            await this.orm.create(this.model, [this.state.task])
        } else {
            await this.orm.write(this.model, [this.state.activeId], this.state.task)
        }

        await this.getAllTasks()
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id])
        await this.getAllTasks()

    }

    async toggleTask(e, task){
        await this.orm.write(this.model, [task.id], {completed: e.target.checked})
        await this.getAllTasks()
    }

    async updateColor(e, task){
        await this.orm.write(this.model, [task.id], {color: e.target.value})
        await this.getAllTasks()
    }

    resetForm(){
        this.state.task = {name:'', color:'#FFFFFF', completed:false}
    }

}

TodoListContainer.template = "owl_app.TodoListContainer";
registry.category('actions').add('owl_app.action_todo_list_js', TodoListContainer);
