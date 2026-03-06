import React, { useEffect, useState } from 'react';
import { Plus, Check, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { subscriptionService } from '../../api/services';

export const SubscriptionManagement = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subscriptionService.getPlans().then(data => {
      setPlans(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscription Plans</h1>
          <p className="text-slate-500">Manage pricing tiers and platform features.</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} /> Create Plan
        </Button>
      </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="relative flex flex-col">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                    <span className="ml-1 text-slate-500">/month</span>
                  </div>
                </div>
                <div className="p-6 flex-1 space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check size={18} className="text-emerald-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Edit2 size={16} /> Edit
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
};
