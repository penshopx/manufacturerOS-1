import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";

import Home from "@/app/page";
import LandingPage from "@/app/landing/page";
import FiturPage from "@/app/fitur/page";
import AIArchitecturePage from "@/app/ai-architecture/page";
import AIDemoPage from "@/app/ai-demo/page";
import AgentPromptsPage from "@/app/agent-prompts/page";
import AgentConfigPage from "@/app/agent-config/page";
import PPAgentPage from "@/app/pp-agent/page";
import QualityAgentPage from "@/app/quality-agent/page";
import MaintenanceAgentPage from "@/app/maintenance-agent/page";
import SupplyChainAgentPage from "@/app/supply-chain-agent/page";
import ProductionExecutionAgentPage from "@/app/production-execution-agent/page";
import DataIntelligenceAgentPage from "@/app/data-intelligence-agent/page";
import ExecutiveReportingAgentPage from "@/app/executive-reporting-agent/page";
import WorkforceAgentPage from "@/app/workforce-agent/page";
import HSEAgentPage from "@/app/hse-agent/page";
import InventoryAgentPage from "@/app/inventory-agent/page";
import ProduksiPage from "@/app/produksi/page";
import KualitasPage from "@/app/kualitas/page";
import GudangPage from "@/app/gudang/page";
import PurchasingPage from "@/app/purchasing/page";
import K3Page from "@/app/k3/page";
import MaintenancePage from "@/app/maintenance/page";
import AuditPage from "@/app/audit/page";
import BelajarPage from "@/app/belajar/page";
import ToolsPage from "@/app/tools/page";
import StategizPage from "@/app/stategi/page";
import MasterPage from "@/app/master/page";
import LaporanPage from "@/app/laporan/page";
import PengaturanPage from "@/app/pengaturan/page";
import PricingPage from "@/app/pricing/page";
import FAQPage from "@/app/faq/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import APIDocsPage from "@/app/api-docs/page";
import CustomerPage from "@/app/customer/[id]/page";
import SupplierPage from "@/app/supplier/[id]/page";
import DeliveryPage from "@/app/delivery/page";

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[280px]">
        <Header />
        <main className="p-6 mt-16">{children}</main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/fitur" component={FiturPage} />
      <Route path="/ai-architecture" component={AIArchitecturePage} />
      <Route path="/ai-demo" component={AIDemoPage} />
      <Route path="/agent-prompts" component={AgentPromptsPage} />
      <Route path="/agent-config" component={AgentConfigPage} />
      <Route path="/pp-agent" component={PPAgentPage} />
      <Route path="/quality-agent" component={QualityAgentPage} />
      <Route path="/maintenance-agent" component={MaintenanceAgentPage} />
      <Route path="/supply-chain-agent" component={SupplyChainAgentPage} />
      <Route path="/production-execution-agent" component={ProductionExecutionAgentPage} />
      <Route path="/data-intelligence-agent" component={DataIntelligenceAgentPage} />
      <Route path="/executive-reporting-agent" component={ExecutiveReportingAgentPage} />
      <Route path="/workforce-agent" component={WorkforceAgentPage} />
      <Route path="/hse-agent" component={HSEAgentPage} />
      <Route path="/inventory-agent" component={InventoryAgentPage} />
      <Route path="/produksi" component={ProduksiPage} />
      <Route path="/kualitas" component={KualitasPage} />
      <Route path="/gudang" component={GudangPage} />
      <Route path="/purchasing" component={PurchasingPage} />
      <Route path="/k3" component={K3Page} />
      <Route path="/maintenance" component={MaintenancePage} />
      <Route path="/audit" component={AuditPage} />
      <Route path="/belajar" component={BelajarPage} />
      <Route path="/tools" component={ToolsPage} />
      <Route path="/stategi" component={StategizPage} />
      <Route path="/master" component={MasterPage} />
      <Route path="/laporan" component={LaporanPage} />
      <Route path="/pengaturan" component={PengaturanPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/api-docs" component={APIDocsPage} />
      <Route path="/customer/:id" component={CustomerPage} />
      <Route path="/supplier/:id" component={SupplierPage} />
      <Route path="/delivery" component={DeliveryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout>
            <Router />
          </AppLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
