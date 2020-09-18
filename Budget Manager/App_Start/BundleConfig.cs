using System.Web;
using System.Web.Optimization;

namespace Budget_Manager
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                    "~/Content/bootstrap.css",
                    "~/Content/font-awesome.css",
                    "~/Content/datatables.bootstrap.css",
                    "~/Content/buttons.dataTables.min.css",
                    "~/Content/Chart.min.css",
                    "~/Content/rdash.css",
                    "~/Content/select.css",              
                    "~/Content/site.css"));


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                    "~/Scripts/jquery-{version}.js",
                    "~/Scripts/bootstrap.js",
                    "~/Scripts/jquery.dataTables.min.js",
                    "~/Scripts/Chart.min.js",
                    "~/Scripts/jszip.min.js",
                    "~/Scripts/dataTables.buttons.min.js",
                    "~/Scripts/buttons.colVis.min.js",
                    "~/Scripts/buttons.flash.min.js",
                    "~/Scripts/buttons.html5.min.js",
                    "~/Scripts/buttons.print.min.js"
                    ));


            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                   "~/Scripts/angular.js",
                   "~/Scripts/angular-ui-router.js",
                   "~/Scripts/angular-cookies.js",
                   "~/Scripts/angular-animate.js",
                   "~/Scripts/angular-touch.js",
                   "~/Scripts/angular-sanitize.js",
                   "~/Scripts/ui-bootstrap-tpls-2.5.0.min.js",
                   "~/Scripts/angular-local-storage.min.js",
                   "~/Scripts/angular-chart.min.js",
                   "~/Scripts/angular-datatables.min.js",
                   "~/Scripts/angular-datatables.buttons.min.js",
                   "~/Scripts/select.js",
                   "~/Scripts/spin.min.js",
                   "~/Scripts/angular-loading.js",
                   "~/App/app.js"
                   ));
        }
    }
}