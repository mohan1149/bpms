import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
export const globalFilters = ['id', 'civilId', 'name', 'orderTreackId', 'customerName', 'campaignName', 'msisdn', 'area', 'status', 'taskId'];
export const orderStatuses = [
    { value: 'Draft', name: 'Draft' },
    { value: 'In Progress', name: 'In Progress' },
    { value: 'Submitted', name: 'Submitted' },
    { value: 'Cancelled', name: 'Cancelled' },
    { value: 'Returned', name: 'Returned' },
    { value: 'Dispatch', name: 'Dispatch' },
    { value: 'Dispatched', name: 'Dispatched' },
    { value: 'Out-For-Delivery', name: 'Out-For-Delivery' },
    { value: 'Rescheduled', name: 'Rescheduled' },
    { value: 'Delivered', name: 'Delivered' },
];
export const formatOrderDataForDataTable = (data) => {
    let formattedOrders = [];
    data?.forEach((item) => {
        let orderItem = {
            id: item.id,
            civilId: item.dmsCustomer.civilId,
            createDate: item.createDate,
            createdBy: item.createdBy,
            orderTreackId: item.ordTrackId,
            customerName: item.dmsCustomer.fullName,
            campaignName: item.dmsCampaign.shcode,
            msisdn: item.dmsCustomer.contactNo,
            devices: item.dmsOrderItems.length,
            area: item.dmsCustomer.custAddresses[0].governateName + ', ' + item.dmsCustomer.custAddresses[0].areaName,
            status: item.orderStatus.description,
            taskId: item.dmsOrderTimelines[0].taskId,
        };
        formattedOrders.push(orderItem);
    });
    return formattedOrders;
}

export const formatTaskDataForDataTable = (data) => {
    let formattedTasks = [];
    data?.forEach((item) => {
        let taskItem = {
            createDate: getValueFromKey(item.taskMetaInfo, 'ORDER_DATE'),//item.taskMetaInfo[9].value,
            orderTreackId: getValueFromKey(item.taskMetaInfo, 'ORD_TRACK_ID'),//item.taskMetaInfo[10].value,
            customerName: getValueFromKey(item.taskMetaInfo, 'FULL_NAME'),
            campaignName: getValueFromKey(item.taskMetaInfo, 'CAMPAIGN'),//item.taskMetaInfo[3].value,
            msisdn: getValueFromKey(item.taskMetaInfo, 'CONTACT_NO'),//item.taskMetaInfo[5].value,
            area: getValueFromKey(item.taskMetaInfo, 'AREA'),//item.taskMetaInfo[6].value,
            status: getValueFromKey(item.taskMetaInfo, 'STATUS_DETAILS'), //item.taskMetaInfo[8].value,
            civilId: getValueFromKey(item.taskMetaInfo, 'CIVIL_ID'),
            taskId: item.id,
            assignee: item.assignee,
            acknowledged: getValueFromKey(item.taskMetaInfo, 'ACKNOWLEDGED'),//item.taskMetaInfo[12] !== undefined ? item.taskMetaInfo[12].value :'',
        };
        formattedTasks.push(taskItem);
    });
    return formattedTasks;
}

const getValueFromKey = (record, key) => {
    const row = record.filter((item) => item.name === key);
    return row[0]?.value;
}

export class DataTablefilters {
    dataTablefilters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        createdBy: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        assignee: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        civilId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        orderTreackId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        customerName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        campaignName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        msisdn: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        devices: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        area: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { value: null, matchMode: FilterMatchMode.IN },
        taskId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
}
export const statusItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
            <span>{option.name}</span>
        </div>
    );
};
export const statusFilter = (options) => {
    return <MultiSelect
        value={options.value}
        options={orderStatuses}
        itemTemplate={statusItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
    />;
};





