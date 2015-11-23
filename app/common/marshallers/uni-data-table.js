/**
 * Created by Timofey Novitskiy on 10.03.2015.
 */
define([
    'app/common/marshallers/marshaller-factory',
    'app/core/uni-data/uni-data-table',
    'app/common/collections/map/hash-map',
    'app/common/collections/list/linked-list'
], function (MarshallerFactory, UniDataTable, HashMap, LinkedList) {
    var UniDataTableFieldsMarshaller;

    require(['app/common/marshallers/uni-data-table-fields'], function(_UniDataTableFieldsMarshaller){
        UniDataTableFieldsMarshaller = _UniDataTableFieldsMarshaller;
    });

    return MarshallerFactory(
        /*Serialize*/
        function (uniDataTable) {
            return uniDataTable && uniDataTable.toJson();
        },

        /*Deserialize*/
        function (jsonData) {
            var attributes = new HashMap(jsonData.attributes),
                columns = LinkedList.fromArray(jsonData.columns),
                rows = LinkedList.fromArray(jsonData.rows.map(function(row){
                    return UniDataTableFieldsMarshaller.deserialize(row);
                }));

            return new UniDataTable(columns, rows, attributes);
        });
});