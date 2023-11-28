/** @odoo-module **/

import { registry } from '@web/core/registry';
import { listView } from '@web/views/list/list_view';
import { ListController } from '@web/views/list/list_controller';
import { useService} from '@web/core/utils/hooks'

class ResPartnerListController extends ListController{

    setup(){
        super.setup()

        this.actionService = useService('action')
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
}

export const resPartnerListView = {
    ...listView,
    Controller: ResPartnerListController,
    buttonTemplate: "odoo_owl_app.ResPartnerListView.Buttons",
}

registry.category('views').add('res_partner_list_view', resPartnerListView)
