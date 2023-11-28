/** @odoo-module **/

import { registry } from '@web/core/registry';
import { kanbanView } from '@web/views/kanban/kanban_view';
import { KanbanController } from '@web/views/kanban/kanban_controller';
import { useService} from '@web/core/utils/hooks'

const { onWillStart } = owl;

class ResPartnerKanbanController extends KanbanController{

    setup(){
        super.setup()

        this.actionService = useService('action')
        this.orm = useService('orm')

        onWillStart(async ()=>{
            this.customerLocations = await this.orm.readGroup('res.partner', [], ['state_id'], ['state_id'])
            console.log('this.customerLocations : ', this.customerLocations)
        })
    }

    openSaleOrderView(){
        this.actionService.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t('Sales Orders'),
            res_model: 'sale.order',
            views: [[false, 'list'], [false, 'form']],
        })
    }
    openAccountMoveView(){
        this.actionService.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t('Invoices'),
            res_model: 'account.move',
            views: [[false, 'list'], [false, 'form']],
        })
    }

    filterCustomers(state){
        const id = state[0]
        const name = state[1]
        this.env.searchModel.setDomainParts({
            state: {
                domain: [['state_id', '=', id]],
                facetLabel: name
            }
        })
    }
}

ResPartnerKanbanController.template = 'odoo_owl_app.ResPartnerKanbanView'

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "odoo_owl_app.ResPartnerKanbanView.Buttons",
}

registry.category('views').add('res_partner_kanban_view', resPartnerKanbanView)
