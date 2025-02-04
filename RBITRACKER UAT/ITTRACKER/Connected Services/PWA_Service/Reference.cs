﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RBIDATATRACK.PWA_Service {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="PWA_Service.IPWA_Service")]
    public interface IPWA_Service {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/DoWork", ReplyAction="http://tempuri.org/IPWA_Service/DoWorkResponse")]
        void DoWork();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/DoWork", ReplyAction="http://tempuri.org/IPWA_Service/DoWorkResponse")]
        System.Threading.Tasks.Task DoWorkAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaSelectData", ReplyAction="http://tempuri.org/IPWA_Service/PwaSelectDataResponse")]
        System.Data.DataSet PwaSelectData(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaSelectData", ReplyAction="http://tempuri.org/IPWA_Service/PwaSelectDataResponse")]
        System.Threading.Tasks.Task<System.Data.DataSet> PwaSelectDataAsync(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaConfirmData", ReplyAction="http://tempuri.org/IPWA_Service/PwaConfirmDataResponse")]
        string PwaConfirmData(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaConfirmData", ReplyAction="http://tempuri.org/IPWA_Service/PwaConfirmDataResponse")]
        System.Threading.Tasks.Task<string> PwaConfirmDataAsync(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaSelectClob", ReplyAction="http://tempuri.org/IPWA_Service/PwaSelectClobResponse")]
        string PwaSelectClob(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaSelectClob", ReplyAction="http://tempuri.org/IPWA_Service/PwaSelectClobResponse")]
        System.Threading.Tasks.Task<string> PwaSelectClobAsync(string flag, string PageVal, string parval1, string parval2, string parval3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaDocumentUpload", ReplyAction="http://tempuri.org/IPWA_Service/PwaDocumentUploadResponse")]
        string PwaDocumentUpload(string flag, string Param, byte[] upload_file);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IPWA_Service/PwaDocumentUpload", ReplyAction="http://tempuri.org/IPWA_Service/PwaDocumentUploadResponse")]
        System.Threading.Tasks.Task<string> PwaDocumentUploadAsync(string flag, string Param, byte[] upload_file);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IPWA_ServiceChannel : RBIDATATRACK.PWA_Service.IPWA_Service, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class PWA_ServiceClient : System.ServiceModel.ClientBase<RBIDATATRACK.PWA_Service.IPWA_Service>, RBIDATATRACK.PWA_Service.IPWA_Service {
        
        public PWA_ServiceClient() {
        }
        
        public PWA_ServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public PWA_ServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public PWA_ServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public PWA_ServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public void DoWork() {
            base.Channel.DoWork();
        }
        
        public System.Threading.Tasks.Task DoWorkAsync() {
            return base.Channel.DoWorkAsync();
        }
        
        public System.Data.DataSet PwaSelectData(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaSelectData(flag, PageVal, parval1, parval2, parval3);
        }
        
        public System.Threading.Tasks.Task<System.Data.DataSet> PwaSelectDataAsync(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaSelectDataAsync(flag, PageVal, parval1, parval2, parval3);
        }
        
        public string PwaConfirmData(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaConfirmData(flag, PageVal, parval1, parval2, parval3);
        }
        
        public System.Threading.Tasks.Task<string> PwaConfirmDataAsync(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaConfirmDataAsync(flag, PageVal, parval1, parval2, parval3);
        }
        
        public string PwaSelectClob(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaSelectClob(flag, PageVal, parval1, parval2, parval3);
        }
        
        public System.Threading.Tasks.Task<string> PwaSelectClobAsync(string flag, string PageVal, string parval1, string parval2, string parval3) {
            return base.Channel.PwaSelectClobAsync(flag, PageVal, parval1, parval2, parval3);
        }
        
        public string PwaDocumentUpload(string flag, string Param, byte[] upload_file) {
            return base.Channel.PwaDocumentUpload(flag, Param, upload_file);
        }
        
        public System.Threading.Tasks.Task<string> PwaDocumentUploadAsync(string flag, string Param, byte[] upload_file) {
            return base.Channel.PwaDocumentUploadAsync(flag, Param, upload_file);
        }
    }
}
