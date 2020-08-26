using Autofac;
using Autofac.Integration.WebApi;
using Budget_Manager.DLL.Implementations;
using Budget_Manager.DLL.Interfaces;
using System.Reflection;
using System.Web.Http;

namespace Budget_Manager.App_Start
{
    public class AutofacWebapiConfig
    {
        public static IContainer Container;

        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }


        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            //Register your Web API controllers.  
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());



            builder.RegisterType<CodeRepo>()
                   .As<ICodeRepo>()
                   .InstancePerRequest();

            builder.RegisterType<TransactionRepo>()
                   .As<ITransactionRepo>()
                   .InstancePerRequest();

            builder.RegisterType<FiscalYearRepo>()
                   .As<IFiscalYearRepo>()
                   .InstancePerRequest();

            builder.RegisterType<TransactionTypeRepo>()
                   .As<ITransactionTypeRepo>()
                   .InstancePerRequest();

            builder.RegisterType<DashBoardRepo>()
                   .As<IDashBoardRepo>()
                   .InstancePerRequest();

            builder.RegisterType<ReportRepo>()
                   .As<IReportRepo>()
                   .InstancePerRequest();
            
            //Set the dependency resolver to be Autofac.  
            Container = builder.Build();

            return Container;
        }

    }
}