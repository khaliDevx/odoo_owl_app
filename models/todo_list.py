# -*- coding: utf-8 -*-

from odoo import api, fields, models, _


class TodoList(models.Model):
    _name = "todo.list"
    _description = "Todo List Model"

    name = fields.Char(string="Name", required=True)
    completed = fields.Boolean(string="Done")
    color = fields.Char()
