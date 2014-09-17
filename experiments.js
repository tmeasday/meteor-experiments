Documents = new Meteor.Collection('documents');

if (Meteor.isClient) {
  Meteor.subscribe('documents');
}

if (Meteor.isServer) {
  Meteor.publish('documents', function() {
    return Documents.find();
  });
}
