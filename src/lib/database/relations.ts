import { relations } from 'drizzle-orm/relations';
import {
	users,
	sessions,
	customers,
	professionals,
	services,
	events,
	serviceHasProfessional
} from './schema';

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	customers: many(customers),
	professionals: many(professionals),
	services: many(services)
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
	user: one(users, {
		fields: [customers.userId],
		references: [users.id]
	}),
	events: many(events)
}));

export const professionalsRelations = relations(professionals, ({ one, many }) => ({
	user: one(users, {
		fields: [professionals.userId],
		references: [users.id]
	}),
	events: many(events),
	serviceHasProfessionals: many(serviceHasProfessional)
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
	user: one(users, {
		fields: [services.userId],
		references: [users.id]
	}),
	events: many(events),
	serviceHasProfessionals: many(serviceHasProfessional)
}));

export const eventsRelations = relations(events, ({ one }) => ({
	customer: one(customers, {
		fields: [events.customerId],
		references: [customers.id]
	}),
	professional: one(professionals, {
		fields: [events.professionalId],
		references: [professionals.id]
	}),
	service: one(services, {
		fields: [events.serviceId],
		references: [services.id]
	})
}));

export const serviceHasProfessionalRelations = relations(serviceHasProfessional, ({ one }) => ({
	professional: one(professionals, {
		fields: [serviceHasProfessional.professional],
		references: [professionals.id]
	}),
	service: one(services, {
		fields: [serviceHasProfessional.service],
		references: [services.id]
	})
}));
