Documents = new Meteor.Collection('documents');

if (Meteor.isClient) {
  Meteor.subscribe('documents');
  
  UI.registerHelper('debugInfo', function() {
    var doc = Documents.findOne() || {data: ''};
    return 'Documents: ' + Documents.find().count() + ' of size: ' + doc.data.length;
  });
}

if (Meteor.isServer) {
  Meteor.publish('documents', function() {
    return Documents.find();
  });

  Meteor.startup(function() {
    console.log('Building dataset...');
    //~10k of data by default
    var num = process.env.DOCUMENT_NUMBER || 200;
    var size = process.env.DOCUMENT_SIZE || 100;
    
    var data = [];
    _.times(size, function() {
      data.push('d')
    });
    var dataString = data.join('');

    Documents.remove({});
    _.times(num, function() {
      Documents.insert({data: dataString});
    });

    console.log('Built dataset (documents:' + num + ' size: ' + size + ')');
  });
}
