exports.MSAPP = exports.MSAPP || {};
exports.MSAPP.Repo = exports.MSAPP.Repo || {};

var q               = require("q");
var UserModel   = require("../models/User");


exports.MSAPP.Repo.SaveNewUser = function(data){
    var deferred = q.defer();
    var newModel = new UserModel(data);
    newModel.save(function(err, doc){
        if(err){
            console.log("error in saving at user details");
            console.log(err);
            deferred.reject({status: false, message: 'Failed to save', obj :err});
        }
        else{
            deferred.resolve({status: true, message: "Saved successfully", obj : doc});
        }
    });
    return deferred.promise;
};

exports.MSAPP.Repo.FindUsersFromDB = function(isSingle, query, selectFields, populateParams, sortParams, limit, skip){
    var deferred = q.defer();
    if(isSingle){
        UserModel.findOne(query)
            .select(selectFields || "")
            .populate(populateParams || "")
            .exec(function(err , doc){
                if(err){
                    console.log("err");
                    console.log(err);
                    deferred.reject({status: false, message:"Error in finding previous saved docs", obj : err});
                }
                else{
                    deferred.resolve({status: true, message:"Found Successfully", obj : doc})
                }
            });
    }
    else{
        UserModel.find(query)
            .sort(sortParams || '')
            .select(selectFields || '')
            .populate(populateParams || "")
            .limit(limit ? parseInt(limit) : 0)
            .skip(skip ? parseInt(skip) : 0)
            .exec(function(err , docs){
                if(err){
                    console.log("err");
                    console.log(err);
                    deferred.reject({status: false, message:"Error in finding previous saved docs", obj : null, err : err});
                }
                else{
                    deferred.resolve({status: true, message:"Found Successfully", obj : docs})
                }
            });
    }
    return deferred.promise;
};