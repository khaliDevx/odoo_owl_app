# -*- coding: utf-8 -*-

{
      "name":  "OWL App",
      "summary":  """A module build with the owl js framework.""",
      "description":  """OA module build with the owl js framework.""",
      'version': '16.0.1.0.0',
      "category":  "OWL",
      "sequence":  -1,
      "author":  "Khalid",
      "depends": ['contacts', 'sale'],
      "demo": [],
      "data": [
            'security/ir.model.access.csv',
            'views/todo_list_view.xml',
            'views/res_partner.xml',
      ],
      "assets": {
            'web.assets_backend': [
                  'odoo_owl_app/static/src/components/**/*',
            ],
      },
      "application":  True,
      "installable":  True,
      "auto_install":  False,
      'license': 'LGPL-3',
}
